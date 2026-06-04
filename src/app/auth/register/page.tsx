import AuthBackground from "@/components/auth/AuthBackground";
import AuthCard from "@/components/auth/AuthCard";
import AuthIllustration from "@/components/auth/AuthIllustration";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <AuthBackground>
            {/* Kiri — form */}
            <AuthCard
                title="Buat Akun Baru"
                subtitle="Bergabung dan mulai berkontribusi untuk kotamu"
            >
                <RegisterForm />
            </AuthCard>

            {/* Kanan — ilustrasi */}
            <AuthIllustration variant="register" />
        </AuthBackground>
    );
}