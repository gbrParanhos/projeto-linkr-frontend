import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";


export default function AuthSubmit({
loading,
idleText,
loadingText,
}: {
loading: boolean;
idleText: string;
loadingText: string;
}) {
return (
<Button
type="submit"
disabled={loading}
className="h-[56px] sm:h-[60px] lg:h-[65px] bg-[#1877F2] hover:bg-[#166fe0] text-white font-oswald font-bold text-[20px] sm:text-[24px] lg:text-[27px] leading-[100%] tracking-[0em] transition-all disabled:opacity-70"
>
{loading ? (
<div className="flex items-center justify-center gap-2">
<Loader2 className="animate-spin h-5 w-5 sm:h-6 sm:w-6" />
{loadingText}
</div>
) : (
idleText
)}
</Button>
);
}