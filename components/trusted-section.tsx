export function TrustedSection() {
    return (
        <section className="bg-[#FFF4B3] py-20 px-6">
            <div className="max-w-[1440px] mx-auto w-full flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-black mb-6">
                    Trusted by Customers
                </h2>
                <div className="flex items-center justify-center gap-3 text-sm md:text-base lg:text-lg text-black font-sans uppercase tracking-widest text-balance">
                    <span>Promote Craft</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-black block"></span>
                    <span>Support the artisan</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-black block"></span>
                    <span>Preserve a Heritage</span>
                </div>
            </div>
        </section>
    )
}
