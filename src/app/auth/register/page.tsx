import AuthBackground from "@/components/common-ui/AuthBackground";
import AuthCard from "@/components/common-ui/AuthCard";
import AuthIllustration from "@/components/common-ui/AuthIllustration";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <AuthBackground>
            {/* Left — illustration */}
            <AuthIllustration variant="register" />

            {/* Right — form */}
            <AuthCard
                title="Buat Akun Baru"
                subtitle="Bergabung dan mulai berkontribusi untuk kotamu"
            >
                <RegisterForm />
            </AuthCard>
        </AuthBackground>
    );
}