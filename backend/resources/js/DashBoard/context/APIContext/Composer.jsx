import React from 'react';

export const Composer = (...components) => {
    return components.reduce(
        (Acc, Curr) => {
            return ({ children }) => {
                return (
                    <Acc>
                        <Curr>{children}</Curr>
                    </Acc>
                );
            };
        },
        ({ children }) => <>{children}</>,
    );
};
