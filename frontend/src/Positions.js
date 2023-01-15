import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Positions = () => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        fetchPositions();
    }, []);

    const fetchPositions = async () => {
        try {
            const res = await axios.get('/positions');
            setPositions(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Pair</th>
                        <th>Entry Price</th>
                        <th>Exit Price</th>
                        <th>Qty</th>
                        <th>Position</th>
                        <th>PNL(USDT)</th>
                        <th>PNL(%)</th>
                        <th>Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {positions.map((position) => (
                        <tr key={position._id}>
                            <td>{position.pair}</td>
                            <td>{position.entryPrice}</td>
                            <td>{position.exitPrice}</td>
                            <td>{position.qty}</td>
                            <td>{position.position === 1 ? 'LONG' : 'SHORT'}</td>
                            <td>{((position.exitPrice - position.entryPrice) * position.qty) * position.position}</td>
                            <td>{(((position.exitPrice - position.entryPrice) / position.entryPrice) * position.position * 100).toFixed(2)}%</td>
                            <td>{((position.exitPrice - position.entryPrice) * position.qty) * position.position > 0 ? 'TRUE' : 'FALSE'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Positions;
