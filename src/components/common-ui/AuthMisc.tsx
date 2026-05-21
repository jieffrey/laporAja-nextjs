type AuthDividerProps = {
    text?: string;
};

export function AuthDivider({ text = "atau" }: AuthDividerProps) {
    return (
        <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/15" />
            <span className="text-[12px] text-white/40">{text}</span>
            <div className="h-px flex-1 bg-white/15" />
        </div>
    );
}

export function AuthFooterNote() {
    return (
        <p className="mt-6 text-center text-[12px] text-white/35">
            Dengan melanjutkan, kamu menyetujui{" "}
            <span className="cursor-pointer text-white/50 hover:text-white/70 transition-colors">
                Syarat & Ketentuan
            </span>{" "}
            dan{" "}
            <span className="cursor-pointer text-white/50 hover:text-white/70 transition-colors">
                Kebijakan Privasi
            </span>
        </p>
    );
}