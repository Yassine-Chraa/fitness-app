import React, { FC } from 'react';

export const Composer = (...components: any): any => {
    return components.reduce(
        (Acc:any, Curr:any) => {
            return ({ children }: any): JSX.Element => {
                return (
                    <Acc>
                        <Curr>{children}</Curr>
                    </Acc>
                );
            };
        },
        ({ children }:any) => <>{children}</>,
    );
};