import Logo from "@/assets/logo.svg";
import Image from "next/image";

interface Props {
    width?: number;
    height?: number;
}

export default function BaseLogo(props: Props) {
    return (
        <Image className="rounded-xl" src={Logo} alt="Application Logo" width={props.width} height={props.height} />
    );
}
