import React from 'react'

export default function TrailCreateBody(
    {
        trail,
        handleName,
        handleDescription,
        trailNameVald,
    }
) {

    return (
        <div className='trailDetailsBody'>
            <div>
                <label htmlFor='trailName'>Name</label>
                <input id='trailName' type='text' value={trail.name} onChange={handleName} />
                <p className='inputValidation'>{trailNameVald}</p>
            </div>
            <div>
                <label htmlFor='description'>Description</label><br />
                <textarea id='description' value={trail.description} onChange={handleDescription} aria-multiline />
            </div>
        </div>
    )
}
