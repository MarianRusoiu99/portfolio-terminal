import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import data from "@/lib/data.json";
import { Mail, MapPin } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const ContactComponent = () => {
  const { setCursorType } = useCursor();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    const webhookUrl =
      import.meta.env.VITE_CONTACT_FORM_WEBHOOK_URL ??
      import.meta.env.VITE_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('Webhook URL not configured');
      toast({
        title: "Configuration Error",
        description: "Contact form is not properly configured. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        timestamp: new Date().toISOString(),
        source: 'portfolio-website'
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json().catch(() => ({}));
    })
    .then(() => {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      form.reset();
    })
    .catch(error => {
      console.error('Error sending form:', error);
      toast({
        title: "Send Failed",
        description: "There was an error sending your message. Please try again or contact me directly.",
        variant: "destructive",
      });
    });
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="mb-1 relative z-10">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Contact</h2>
        <p className="text-base text-muted-foreground/80 leading-relaxed">{data.contact.description}</p>
      </div>

      <div className="space-y-5">
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-primary" />
            <a
              href={`mailto:${data.contact.email}`}
              className="text-base text-muted-foreground hover:text-primary"
              onMouseEnter={() => setCursorType("link")}
              onMouseLeave={() => setCursorType("default")}
            >
              {data.contact.email}
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <MapPin className="w-5 h-5 text-primary" />
            <p className="text-base text-muted-foreground">{data.contact.location}</p>
          </div>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-foreground/80">{data.contactForm.name.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={data.contactForm.name.placeholder}
                          {...field}
                          className="bg-secondary/10 border-white/5 focus-visible:ring-primary text-base h-12 rounded-full"
                          onMouseEnter={() => setCursorType("link")}
                          onMouseLeave={() => setCursorType("default")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-foreground/80">{data.contactForm.email.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={data.contactForm.email.placeholder}
                          {...field}
                          className="bg-secondary/10 border-white/5 focus-visible:ring-primary text-base h-12 rounded-full"
                          onMouseEnter={() => setCursorType("link")}
                          onMouseLeave={() => setCursorType("default")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-foreground/80">{data.contactForm.subject.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={data.contactForm.subject.placeholder}
                        {...field}
                        className="bg-secondary/10 border-white/5 focus-visible:ring-primary text-base h-12 rounded-full"
                        onMouseEnter={() => setCursorType("link")}
                        onMouseLeave={() => setCursorType("default")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-foreground/80">{data.contactForm.message.label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={data.contactForm.message.placeholder}
                        className="min-h-[140px] bg-secondary/10 border-white/5 focus-visible:ring-primary text-base rounded-xl resize-none"
                        {...field}
                        onMouseEnter={() => setCursorType("link")}
                        onMouseLeave={() => setCursorType("default")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full sm:w-auto rounded-full px-8 h-12 bg-primary/90 hover:bg-primary text-primary-foreground transition-all font-medium"
                onMouseEnter={() => setCursorType("link")}
                onMouseLeave={() => setCursorType("default")}
              >
                {data.contactForm.button}
              </Button>
            </form>
          </Form>
        </div>
    </div>
  );
};

export const Contact = React.memo(ContactComponent);