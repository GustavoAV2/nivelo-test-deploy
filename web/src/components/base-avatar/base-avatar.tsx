import Image from "next/image";

interface Props {
    className?: string;
    src: string;
}

export default function BaseAvatar(props: Props) {
    return (
        <Image
            className={`${props.className} rounded-full`}
            src={props.src}
            alt={"Profile Avatar"}
            width={48}
            height={48}
        />
    );
}
