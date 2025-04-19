import React from 'react';

export default function GradeStats () {

    const tableHeaders = ['course name', 'exam period', 'initial grades submission', 'final grades submission'];
    
    return (
        <div>
            <h2>Available course statistics</h2>
            <table>
                <tr>
                {
                    tableHeaders.map((th) =>
                    <th>{th}</th>)
                }
                </tr>
            </table>
        </div>
    )
}