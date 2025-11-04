import { Card, CardContent } from "../ui/card";


export default function FormShell({ children }: { children: React.ReactNode }) {
return (
<Card className="w-full max-w-sm bg-transparent border-none shadow-none">
<CardContent className="p-0 flex flex-col gap-6">
{children}
</CardContent>
</Card>
);
}