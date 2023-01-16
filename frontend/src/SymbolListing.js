import React, { useState, useEffect, useMemo } from 'react';

const SymbolListing = ({ handleClose, handleLong, handleShort, symbols }) => {
    const [prices, setPrices] = useState({});
    const [initialPrices, setInitialPrices] = useState({});
    const [wsConnections, setWsConnections] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const symbolsMemo = useMemo(() => symbols, [symbols]);
    const [connected, setConnected] = useState(0);


    useEffect(() => {
        setIsLoading(true);

        symbolsMemo.forEach(symbol => {
            if (!wsConnections[symbol.marketSymbol]) {
                const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.marketSymbol.toLowerCase()}@ticker`);
                ws.onmessage = (msg) => {
                    const data = JSON.parse(msg.data);
                    setPrices(prevPrices => ({ ...prevPrices, [symbol.marketSymbol]: data.c }));
                    setConnected(prevConnected => prevConnected + 1);
                };
                setWsConnections(prevConnections => ({ ...prevConnections, [symbol.marketSymbol]: ws }));
            }
        });

        return () => {
            Object.values(wsConnections).forEach(ws => ws.close());
        };
    }, [wsConnections, symbolsMemo]);

    useEffect(() => {
        if (connected === symbolsMemo.length) {
            setInitialPrices(prices);
            setIsLoading(false);
        }
    }, [prices, connected, symbolsMemo]);

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) :
                (
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
                                            {!symbol.position ? (
                                                <>
                                                    <button onClick={() => handleLong(symbol)}>LONG</button>
                                                    <button onClick={() => handleShort(symbol)}>SHORT</button>
                                                </>
                                            ) : (
                                                <button onClick={() => handleClose(symbol)}>CLOSE</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        </div>
    );
}

export default SymbolListing;