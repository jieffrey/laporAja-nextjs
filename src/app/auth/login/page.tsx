import AuthBackground from "@/components/common-ui/AuthBackground";
import AuthCard from "@/components/common-ui/AuthCard";
import AuthIllustration from "@/components/common-ui/AuthIllustration";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <AuthBackground>
            {/* Left — illustration */}
            <AuthIllustration variant="login" />

            {/* Right — form */}
            <AuthCard
                title="Masuk ke LaporAja"
                subtitle="Laporkan masalah lingkungan di sekitar kamu"
            >
                <LoginForm />
            </AuthCard>
        </AuthBackground>
    );
}