import { Mail, MapPin, Phone } from "lucide-react"
import { SiGithub, SiMastodon } from "@icons-pack/react-simple-icons"

export const Contact = () => {
    return <section id="contact"
    className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Contact Me
            </h2>

            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                please reach out
            </p>

            <div className="flex flex-wrap justify-center">
                <div className="space-y-6 justify-center">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary"/>
                                </div>
                                <div>
                                    <h4 className="text-left font-medium">Email</h4>
                                    <a href="mailto:markeisenberg43@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                                        markeisenberg@posteo.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary"/>
                                </div>
                                <div>
                                    <h4 className="text-left font-medium">Location</h4>
                                    <a className="text-muted-foreground hover:text-primary transition-colors">
                                        Amsterdam, Netherlands
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="pt-8 justify-center">
                        <h4 className="font-medium mb-4 text-center">Connect with me on the Open Social Web</h4>
                        <div className="flex space-x-4 justify-center">
                            <a href="https://techhub.social/@markeisenbergUX" rel="me" target="_blank">
                                <SiMastodon />
                            </a>
                        </div>
                    </div>

        </div>
    </section>
}
