import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "./CodeBlock";

export const IdeaToProduction = () => {
    const codeSnippet = `
import { pipeline } from '@xenova/transformers';

class MyTranscriptionPipeline {
    static task = 'automatic-speech-recognition';
    static model = 'openai/whisper-tiny.en';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}
`;
    return (
        <div className="w-full text-left bg-card/50 p-4 rounded-md border border-border">
            <h4 className="font-bold text-accent">From Idea to Production</h4>
            <p className="text-sm text-muted-foreground mb-4">A journey of building a full-stack application from scratch.</p>
            <p className="mb-4 text-sm">This project showcases the entire lifecycle of a modern web application, from initial concept and design in Figma to a fully deployed, scalable solution. It includes a custom backend API, a reactive frontend, and a CI/CD pipeline for automated deployments.</p>
            <CodeBlock code={codeSnippet} language="javascript" />
        </div>
    );
};
