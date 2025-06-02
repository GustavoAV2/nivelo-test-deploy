-- Alterar as colunas creation_date e effective_date para TIMESTAMP WITH TIME ZONE
ALTER TABLE income 
    ALTER COLUMN creation_date TYPE TIMESTAMP WITH TIME ZONE USING creation_date::TIMESTAMP WITH TIME ZONE, 
    ALTER COLUMN effective_date TYPE TIMESTAMP WITH TIME ZONE USING effective_date::TIMESTAMP WITH TIME ZONE;

ALTER TABLE expense 
    ALTER COLUMN creation_date TYPE TIMESTAMP WITH TIME ZONE USING creation_date::TIMESTAMP WITH TIME ZONE, 
    ALTER COLUMN effective_date TYPE TIMESTAMP WITH TIME ZONE USING effective_date::TIMESTAMP WITH TIME ZONE;

ALTER TABLE transfer 
    ALTER COLUMN creation_date TYPE TIMESTAMP WITH TIME ZONE USING creation_date::TIMESTAMP WITH TIME ZONE, 
    ALTER COLUMN effective_date TYPE TIMESTAMP WITH TIME ZONE USING effective_date::TIMESTAMP WITH TIME ZONE;

-- Criar índices para melhorar a performance das consultas por timestamps
CREATE INDEX idx_income_creation_date ON income(creation_date);
CREATE INDEX idx_income_effective_date ON income(effective_date);

CREATE INDEX idx_expense_creation_date ON expense(creation_date);
CREATE INDEX idx_expense_effective_date ON expense(effective_date);

CREATE INDEX idx_transfer_creation_date ON transfer(creation_date);
CREATE INDEX idx_transfer_effective_date ON transfer(effective_date);
