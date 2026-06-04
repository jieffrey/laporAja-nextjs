type PasswordStrengthProps = {
    password: string;
};

function getStrength(p: string) {
    if (!p) return null;
    if (p.length < 6) return { score: 1, label: "Lemah", color: "#EF4444" };
    if (p.length < 10) return { score: 2, label: "Cukup", color: "#F59E0B" };
    return { score: 3, label: "Kuat", color: "#0F766E" };
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
    const strength = getStrength(password);
    if (!strength) return null;

    return (
        <div className="mt-2">
            <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                            background:
                                i <= strength.score
                                    ? strength.color
                                    : "#E8E4D9",
                        }}
                    />
                ))}
            </div>
            <p
                className="mt-1.5 text-[11px] font-medium"
                style={{ color: strength.color }}
            >
                Kekuatan password: {strength.label}
            </p>
        </div>
    );
}