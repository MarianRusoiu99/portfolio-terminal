import React from 'react';
import TypingAnimation from './TypingAnimation';
import data from '@/lib/data.json';
import { useCursor } from '@/context/CursorContext';

const AboutComponent = () => {
    return (
        <div className="py-6">
          
            <p
                className="text-left text-base md:text-lg text-muted-foreground"
            >
                <TypingAnimation text={data.about} />
            </p>
        </div>
    );
};

export const About = React.memo(AboutComponent);
