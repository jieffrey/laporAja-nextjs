type PasswordStrengthProps = {
    password: string
}

function getStrength(p: string) {
    if (!p) return null;
    if (p.length < 6) return { score: 1, label: "Lemah", color: "bg-red-400" };
    if (p.length < 10) return { score: 2, label: "Cukup", color: "bg-amber-400" };
    return { score: 3, label: "Kuat", color: "bg-emerald-400" };
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
    const strength = getStrength(password);
    if (!strength) return null;

    return (
        <div className="mt-2">
            <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.color : "bg-white/15"}`}
                    />
                ))}
            </div>
            <p className="mt-1 text-[11px] text-white/50">{strength.label}</p>
        </div>
    );
}