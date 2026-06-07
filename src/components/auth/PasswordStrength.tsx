type PasswordStrengthProps = {
    password: string;
};

type Rule = {
    label: string;
    check: (p: string) => boolean;
};

const RULES: Rule[] = [
    { label: "Min. 1 huruf besar", check: (p) => /[A-Z]/.test(p) },
    { label: "Min. 1 huruf kecil", check: (p) => /[a-z]/.test(p) },
    { label: "Min. 1 angka",       check: (p) => /[0-9]/.test(p) },
];

function getStrength(p: string) {
    if (!p) return null;
    const passed = RULES.filter((r) => r.check(p)).length;
    if (passed === 0) return { score: 0, label: "Belum memenuhi", color: "#EF4444" };
    if (passed < 3)  return { score: 1, label: "Kurang", color: "#F59E0B" };
    return { score: 3, label: "Kuat", color: "#0F766E" };
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
    const strength = getStrength(password);
    if (!strength) return null;

    return (
        <div className="mt-2 space-y-2">
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
                className="text-[11px] font-medium"
                style={{ color: strength.color }}
            >
                Kekuatan password: {strength.label}
            </p>
            <ul className="space-y-0.5">
                {RULES.map((r) => {
                    const ok = r.check(password);
                    return (
                        <li
                            key={r.label}
                            className="flex items-center gap-1.5 text-[11px]"
                            style={{ color: ok ? "#065F46" : "#9CA3AF" }}
                        >
                            <span>{ok ? "✓" : "○"}</span>
                            {r.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
