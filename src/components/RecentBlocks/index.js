import React, { useEffect, useState } from "react";
import { useApi } from "../../contexts/ApiContext";
import Block from "../Block";
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const RecentBlocks = () => {

    const { api } = useApi();
    const [ lastTenBlocks, setLastTenBlocks ] = useState([]);
     const [isLoading, setIsLoading] = useState(true)
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
                return (<Block key={blockHeader.hash} blockHeader={blockHeader} />)
            });
            setIsLoading(false);
            setLastTenBlocks(tenBlocksComponent);
        }
    }

    useEffect(() => {
        getLastestBlockHeader();
    }, [api])

    return (
        <Box>
            {isLoading && <CircularProgress color="secondary" />}
            <Divider>Block Information Board</Divider>
            {!isLoading && <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {lastTenBlocks}
            </List>}
        </Box>
    )
}

export default RecentBlocks;
