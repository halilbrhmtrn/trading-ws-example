const SymbolListing = ({handleClose, handleLong, handleShort, symbols}) => {
    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Pair</th>
                        <th>Market Symbol</th>
                        <th>Position</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {symbols.map((symbol) => (
                        <tr key={symbol._id}>
                            <td>{symbol.pair}</td>
                            <td>{symbol.market_symbol}</td>
                            <td>{symbol.position}</td>
                            <td>{symbol.price}</td>
                            <td>
                                {symbol.position !== 'OPEN' ? (
                                    <>
                                        <button onClick={() => handleLong('LONG')}>LONG</button>
                                        <button onClick={() => handleShort('SHORT')}>SHORT</button>
                                    </>
                                ) : (
                                    <button onClick={() => handleClose()}>CLOSE</button>
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