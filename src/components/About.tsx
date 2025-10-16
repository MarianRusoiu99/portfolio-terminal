import React from 'react';
import TypingAnimation from './TypingAnimation';
import data from '@/lib/data.json';
import { useCursor } from '@/context/CursorContext';

const AboutComponent = () => {
    const { setCursorType } = useCursor();
    return (
        <div className="py-6">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-primary">$</span>
                <p className="text-foreground">./about.sh</p>
            </div>
            <p
                className="text-left text-base md:text-lg text-muted-foreground"
            >
                <TypingAnimation text={data.about} />
            </p>
        </div>
    );
};

export const About = React.memo(AboutComponent);
