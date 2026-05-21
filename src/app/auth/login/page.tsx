import AuthBackground from "@/components/common-ui/AuthBackground";
import AuthCard from "@/components/common-ui/AuthCard";
import AuthIllustration from "@/components/common-ui/AuthIllustration";
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