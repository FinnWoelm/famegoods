import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
    return (
        <div>
            <nav class="bg-white pt-4 px-4 pb-2 justify-left w-full z-10 top-0">
                <div class="mx-auto flex flex-wrap items-center">
                    <h3
                        style={{
                            fontStyle: "italic",
                            fontSize: "1.4em",
                            fontWeight: 800,
                            color: "black",
                        }}
                    >
                        🔥 WHAT'S HOT
          </h3>
                </div>
            </nav>
            {/*
        <header className="fixed top-0 bg-white w-full h-12">
            <h3
                style={{
                    fontStyle: "italic",
                    fontSize: "1.4em",
                    fontWeight: 800,
                    color: "black",
                }}
            >
                🔥 WHAT'S HOT
          </h3>
            </header>*/}
        </div >
    );
}