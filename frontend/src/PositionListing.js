const PositionListing = ({handleClose, positions}) => {
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
                    {positions.map((position) => (
                    <tr key={position._id}>
                        <td>{position.pair}</td>
                        <td>{position.marketSymbol}</td>
                        <td>{position.position}</td>
                        <td>{position.price}</td>
                        <td>
                        {position.action === 'OPEN' ? (
                        <button onClick={() => handleClose(position._id)}>Close</button>
                        ) : (
                        <span>Closed</span>
                        )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        );
    }
    
    export default PositionListing;