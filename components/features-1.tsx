import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Brain, FileText, Layers } from 'lucide-react'
import { ReactNode } from 'react'

export function Features() {
    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <h3 className='text-center font-sans text-3xl'>How it Works</h3>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
                    <Card className="group shadow-black-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <FileText className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">1. Upload</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Upload your PDF or document in one click. We handle the rest.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-black-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Brain className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">2. Generate</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Our AI reads your content and creates smart multiple-choice
                                flashcards instantly.</p>
                        </CardContent>
                    </Card>

                    <Card className="group shadow-black-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Layers className="size-6" aria-hidden />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">3. Practice</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Review your flashcards anytime, track your progress, and boost
                                your memory.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div aria-hidden className="relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
        <div className="absolute inset-0 [--border:black] dark:[--border:white] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l">{children}</div>
    </div>
)