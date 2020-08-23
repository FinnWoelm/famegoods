import React, { useState, useRef, useEffect } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import timesSolid from "@iconify/icons-la/times-solid";
import Link from "next/link";

export default function closeOut() {

    return (
        <div>
            <div className="absolute top-0 right-0">
                <Link href=".">
                    <Icon icon={timesSolid} className="h-8 w-8 mt-4 mr-4" />
                </Link>
            </div>
        </div>
    );
}