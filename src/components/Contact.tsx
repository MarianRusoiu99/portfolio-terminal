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
import { Mail, MapPin, Calendar } from "lucide-react";
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
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <div className="py-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-primary">$</span>
        <p className="text-foreground">./contact.sh</p>
      </div>
      <p className="text-lg max-w-2xl mb-8 text-muted-foreground">{data.contact.description}</p>
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-1 space-y-8">
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-bold text-foreground">Email</h4>
              <a
                href={`mailto:${data.contact.email}`}
                className="text-muted-foreground hover:text-primary transition-colors break-all"
                onMouseEnter={() => setCursorType("link")}
                onMouseLeave={() => setCursorType("default")}
              >
                {data.contact.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-bold text-foreground">Location</h4>
              <p className="text-muted-foreground">{data.contact.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Calendar className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
            <div>
              <h4 className="font-bold text-foreground">Schedule a Call</h4>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                onMouseEnter={() => setCursorType("link")}
                onMouseLeave={() => setCursorType("default")}
              >
                {data.contact.schedule}
              </a>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{data.contactForm.name.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={data.contactForm.name.placeholder}
                          {...field}
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
                      <FormLabel>{data.contactForm.email.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={data.contactForm.email.placeholder}
                          {...field}
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
                    <FormLabel>{data.contactForm.subject.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={data.contactForm.subject.placeholder}
                        {...field}
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
                    <FormLabel>{data.contactForm.message.label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={data.contactForm.message.placeholder}
                        className="min-h-[120px]"
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
                onMouseEnter={() => setCursorType("link")}
                onMouseLeave={() => setCursorType("default")}
              >
                {data.contactForm.button}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export const Contact = React.memo(ContactComponent);
