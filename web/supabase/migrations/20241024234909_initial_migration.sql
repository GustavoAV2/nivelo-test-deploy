-- Criar tabela de contas financeiras (ex: conta corrente, poupança, cartão de crédito)
CREATE TABLE account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de categorias para despesas e receitas (ex: alimentação, transporte, lazer)
CREATE TABLE category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela para receitas financeiras
CREATE TABLE income (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    account_id UUID REFERENCES account(id) ON DELETE CASCADE,
    category_id UUID REFERENCES category(id) ON DELETE SET NULL,
    amount BIGINT NOT NULL, -- Quantia como BIGINT para maior precisão
    creation_date DATE NOT NULL, -- Data de criação definida pelo usuário (apenas data)
    effective_date DATE, -- Data efetiva da receita (futura ou atual)
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela para despesas financeiras
CREATE TABLE expense (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    account_id UUID REFERENCES account(id) ON DELETE CASCADE,
    category_id UUID REFERENCES category(id) ON DELETE SET NULL,
    amount BIGINT NOT NULL, -- Quantia como BIGINT para maior precisão
    creation_date DATE NOT NULL, -- Data de criação definida pelo usuário (apenas data)
    effective_date DATE, -- Data efetiva da despesa (futura ou atual)
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de transferências financeiras
CREATE TABLE transfer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    source_account_id UUID REFERENCES account(id) ON DELETE CASCADE,
    target_account_id UUID REFERENCES account(id) ON DELETE CASCADE,
    amount BIGINT NOT NULL, -- Quantia como BIGINT para maior precisão
    creation_date DATE NOT NULL, -- Data de criação definida pelo usuário (apenas data)
    effective_date DATE, -- Data efetiva da transferência (futura ou atual)
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela para armazenar as views de balances
CREATE TABLE balance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela para relacionar contas com cada balance
CREATE TABLE balance_account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    balance_id UUID NOT NULL REFERENCES balance(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES account(id) ON DELETE CASCADE,
    operation_type TEXT NOT NULL CHECK (operation_type IN ('add', 'subtract')), -- Define se a conta é somada ou subtraída no balance
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela para armazenar os links de compartilhamento (shares) das contas
CREATE TABLE share (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES account(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- O usuário que compartilhou a conta
    share_link TEXT NOT NULL, -- Link único para acessar a conta compartilhada
    is_active BOOLEAN DEFAULT TRUE, -- Indica se o link está ativo
    expires_at TIMESTAMP WITH TIME ZONE, -- Data de expiração do link
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhorar a performance nas consultas
CREATE INDEX idx_income_user_id ON income(user_id);
CREATE INDEX idx_income_account_id ON income(account_id);
CREATE INDEX idx_income_category_id ON income(category_id);

CREATE INDEX idx_expense_user_id ON expense(user_id);
CREATE INDEX idx_expense_account_id ON expense(account_id);
CREATE INDEX idx_expense_category_id ON expense(category_id);

CREATE INDEX idx_transfer_user_id ON transfer(user_id);
CREATE INDEX idx_transfer_source_account_id ON transfer(source_account_id);
CREATE INDEX idx_transfer_target_account_id ON transfer(target_account_id);

CREATE INDEX idx_balance_user_id ON balance(user_id);
CREATE INDEX idx_balance_account_balance_id ON balance_account(balance_id);
CREATE INDEX idx_balance_account_account_id ON balance_account(account_id);

CREATE INDEX idx_share_user_id ON share(user_id);
CREATE INDEX idx_share_account_id ON share(account_id);
CREATE INDEX idx_share_share_link ON share(share_link);
