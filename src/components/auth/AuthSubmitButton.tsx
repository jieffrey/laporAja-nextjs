type AuthSubmitButtonProps = {
    loading: boolean;
    label: string;
    loadingLabel: string;
    disabled?: boolean;
};

export default function AuthSubmitButton({
    loading,
    label,
    loadingLabel,
    disabled,
}: AuthSubmitButtonProps) {
    return (
        <>
            <style jsx>{`
                .auth-submit {
                    background: linear-gradient(135deg, #0F766E, #14B8A6);
                    color: #fff;
                    box-shadow: 0 6px 20px rgba(15, 118, 110, 0.30);
                    transition: all 0.2s ease;
                }
                .auth-submit:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 10px 24px rgba(15, 118, 110, 0.40);
                }
                .auth-submit:active:not(:disabled) {
                    transform: scale(0.98);
                }
                .auth-submit:disabled {
                    cursor: not-allowed;
                    opacity: 0.55;
                    background: #9CA3AF;
                    box-shadow: none;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .spinner {
                    animation: spin 0.8s linear infinite;
                }
            `}</style>

            <button
                type="submit"
                disabled={loading || disabled}
                className="auth-submit w-full rounded-full py-3 text-[15px] font-bold"
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <span
                            className="spinner h-4 w-4 rounded-full"
                            style={{
                                border: "2px solid rgba(255,255,255,0.30)",
                                borderTopColor: "#fff",
                            }}
                        />
                        {loadingLabel}
                    </span>
                ) : (
                    label
                )}
            </button>
        </>
    );
}