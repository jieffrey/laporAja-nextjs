type AuthDividerProps = {
    text?: string;
};

export function AuthDivider({ text = "atau" }: AuthDividerProps) {
    return (
        <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: "#E8E4D9" }} />
            <span className="text-[12px]" style={{ color: "#9CA3AF" }}>
                {text}
            </span>
            <div className="h-px flex-1" style={{ background: "#E8E4D9" }} />
        </div>
    );
}

export function AuthFooterNote() {
    return (
        <p
            className="mt-6 text-center text-[12px] leading-relaxed"
            style={{ color: "#9CA3AF" }}
        >
            Dengan melanjutkan, kamu menyetujui{" "}
            <span
                className="cursor-pointer font-semibold transition-colors"
                style={{ color: "#0F766E" }}
            >
                Syarat &amp; Ketentuan
            </span>{" "}
            dan{" "}
            <span
                className="cursor-pointer font-semibold transition-colors"
                style={{ color: "#0F766E" }}
            >
                Kebijakan Privasi
            </span>
        </p>
    );
}