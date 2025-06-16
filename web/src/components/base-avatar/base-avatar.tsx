import Image from "next/image";

interface Props {
    src: string;
}

export default function BaseAvatar(props: Props) {
    return (
        <Image
            className="rounded-full"
            alt="User Profile Avatar"
            src={props.src}
            width={48}
            height={48}
        />
    );
}
