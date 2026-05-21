type AuthSubmitButtonProps = {
    loading: boolean
    label: string
    loadingLabel: string
    disabled?: boolean
}

export default function AuthSubmitButton({ loading, label, loadingLabel, disabled }: AuthSubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={loading || disabled}
            className="w-full rounded-full bg-white py-3 text-[15px] font-bold text-blue-700 shadow-lg shadow-blue-900/20 transition-all duration-200 hover:-translate-y-px hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-700/30 border-t-blue-700" />
                    {loadingLabel}
                </span>
            ) : (
                label
            )}
        </button>
    );
}