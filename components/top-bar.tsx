export function TopBar() {
    return (
        <div className="w-full bg-black text-white py-3 border-b border-white/10 hidden lg:block">
            <div className="max-w-[1440px] mx-auto px-12 flex items-center justify-center gap-12">
                <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5AB7D]" />
                    <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-medium text-white/90">
                        All India fast delivery
                    </span>
                </div>
                <div className="h-4 w-px bg-white/20" />
                <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5AB7D]" />
                    <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-medium text-white/90">
                        Easy returns and refunds
                    </span>
                </div>
            </div>
        </div>
    )
}
