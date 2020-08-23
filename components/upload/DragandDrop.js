import React, { useEffect } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import cloudUploadAltSolid from '@iconify/icons-la/cloud-upload-alt-solid';
import uploadSolid from '@iconify/icons-la/upload-solid';

export default function DragDrop() {
    return (
        <div>
            <div className="border-dashed border-4 border-gray-500 rounded-lg bg-gray-100 bg-center auto w-full shadow-md ">
                <p className="pt-2 text-center text-2xl text-black font-extrabold tracking-wider capitalize">Drag and Drop</p>
                <p className="text-center pt-1 text-gray-700 tracking-wide font-mono text-sm">Files should be .mp4</p>
                <Icon icon={cloudUploadAltSolid} color="darkslategrey" className="w-full h-24 rounded-lg" />
            </div>
        </div>
    );
}