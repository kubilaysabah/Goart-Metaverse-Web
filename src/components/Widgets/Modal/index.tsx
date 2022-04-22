// React
import type { FC, ReactElement } from "react";
import { memo, Fragment } from "react";

// Interface
import ModalProps from "./index.d";

// @Headless UI
import { Dialog, Transition } from "@headlessui/react";

// Helpers
import { Classes } from "helpers";

const Modal: FC<ModalProps> = ({
    isOpen,
    width,
    title,
    content,
    type,
    button,
    closeModal
}: ModalProps): ReactElement<ModalProps> => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center z-40">
            <section className={`${width ? width : "w-11/12 lg:w-2/5"} p-6 rounded bg-white relative`}>
                {type === "error" ? (
                    <div className="flex items-center">
                        <div className="mr-4">
                            <object data="/error.svg" type="image/svg+xml" />
                        </div>
                        <div className="flex-1">
                            <header className="mb-2">
                                {title && (
                                    <h3 className="text-lg leading-7 font-bold text-gray-900">
                                        {title}
                                    </h3>
                                )}
                            </header>

                            <main>
                                {content}
                            </main>
                        </div>
                    </div>
                ) : (
                    <Fragment>
                        <header className="text-center mb-5">
                            {title && (
                                <h3 className="text-lg leading-7 font-bold text-gray-900">
                                    {title}
                                </h3>
                            )}
                        </header>

                        <main>
                            {content}
                        </main>
                    </Fragment>
                )}

                <footer className="flex flex-wrap items-center justify-end mt-6">
                    <div className={`mr-3 ${type === "message" ? "flex-1" : ""}`}>
                        <button className={`${Classes.button.secondary}`} onClick={() => closeModal && closeModal()}>Cancel</button>
                    </div>
                    {button && (
                        <div className={type === "message" ? "flex-1" : ""}>
                            <button className={`${Classes.button.primary}`} onClick={button.confirmModal}>{button.text}</button>
                        </div>
                    )}
                </footer>
            </section>
        </div>
    );
};


export type {
    ModalProps
}
export default memo(Modal);
