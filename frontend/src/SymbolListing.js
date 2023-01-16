import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const SymbolListing = ({ handleClose, handleLong, handleShort, symbols }) => {
    const navigate = useNavigate();
    const [prices, setPrices] = useState({});
    const [initialPrices, setInitialPrices] = useState({});
    const [wsConnections, setWsConnections] = useState({});
    const symbolsMemo = useMemo(() => symbols, [symbols]);

    useEffect(() => {
        const wsConnections = {};

        symbolsMemo.forEach(symbol => {
            const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.marketSymbol.toLowerCase()}@ticker`);
            ws.onmessage = (msg) => {
                const data = JSON.parse(msg.data);
                setPrices(prevPrices => ({ ...prevPrices, [symbol.marketSymbol]: data.c }));
            };
            wsConnections[symbol.marketSymbol] = ws;
        });

        setWsConnections(wsConnections);

        return () => {
            Object.values(wsConnections).forEach(ws => ws.close());
        };
    }, [symbolsMemo]);

    useEffect(() => {
        if (Object.keys(prices).length === symbolsMemo.length) {
            setInitialPrices(prices);
        }
    }, [prices, symbolsMemo]);

    const handleLongShort = async (symbol, isLong) => {
        if (isLong) {
            await handleLong(symbol);
            navigate('/market-prices');
        } else {
            await handleShort(symbol);
            navigate('/market-prices');
        }
    };

    const handleCloseWrapper = (symbol) => {
        const updatedSymbol = { ...symbol, price: prices[symbol.marketSymbol], action: 'CLOSED' };
        handleClose(updatedSymbol);
    }

    return (
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Pair</th>
                                    <th>Market Symbol</th>
                                    <th>Position</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {symbolsMemo.map((symbol) => (
                                    <tr key={symbol._id}>
                                        <td>{symbol._id}</td>
                                        <td>{symbol.pair}</td>
                                        <td>{symbol.marketSymbol}</td>
                                        <td>{symbol.position}</td>
                                        <td>{prices[symbol.marketSymbol] || initialPrices[symbol.marketSymbol] || symbol.price}</td>
                                        <td>
                                            {!symbol.position || symbol.position === 'CLOSED'? (
                                                <>
                                                    <button onClick={async () => await handleLongShort(symbol, true)}>LONG</button>
                                                    <button onClick={async () => await handleLongShort(symbol, false)}>SHORT</button>

                                                </>
                                            ) : (
                                                <button onClick={() => handleCloseWrapper(symbol)} >CLOSE</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            
    );
}

export default SymbolListing;