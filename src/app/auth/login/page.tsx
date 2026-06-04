import AuthBackground from "@/components/auth/AuthBackground";
import AuthCard from "@/components/auth/AuthCard";
import AuthIllustration from "@/components/auth/AuthIllustration";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <AuthBackground>
            {/* Kiri — ilustrasi */}
            <AuthIllustration variant="login" />

            {/* Kanan — form */}
            <AuthCard
                title="Selamat Datang Kembali 👋"
                subtitle="Masuk dan pantau laporan lingkungan di kotamu"
            >
                <LoginForm />
            </AuthCard>
        </AuthBackground>
    );
}