import React, { useEffect, useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import Block from "../Block";

const RecentBlocks = () => {

    const { api } = useApi();
    const [ lastTenBlocks, setLastTenBlocks ] = useState([]);
    const getLastestBlockHeader = async () => {
        if (api) {
            await api.isReady;
            await api.rpc.chain.subscribeNewHeads((lastHeader) => {
                console.log(`last block #${lastHeader.number} has hash ${lastHeader.hash}`);
                getLastTenBlocks(lastHeader)
            });
        }
    };

    const getLastTenBlocks = async (lastHeader) => {
        if (api) {
            await api.isReady;
            let header = lastHeader
            const headers = []
            for (let i = 0; i < 10; i++) {
                headers.push(header);
                header = await api.rpc.chain.getHeader(header.parentHash);
            }
            const tenBlocksComponent = headers.map(blockHeader => {
                return (<Block blockHeader={blockHeader} />)
            });
            setLastTenBlocks(tenBlocksComponent);
        }
    }

    useEffect(() => {
        getLastestBlockHeader();
    }, [api])

    return (
        <div>
            <div>this is recent Blocks</div>
            {lastTenBlocks}
        </div>
    )
}

export default RecentBlocks;
