import React from 'react'

export default function TrailCreateBody(
    {
        trail,
        handleName,
        handleDifficulty,
        handleDistance,
        handleMinHeight,
        handleMaxHeight,
        handleDescription,
        trailNameVald,
        distanceVald,
        minHeightVald,
        maxHeightVald
    }
) {

    return (
        <div className='trailDetailsBody'>
            <div id='firstRow'>
                <div>
                    <label htmlFor='trailName'>Name</label>
                    <input id='trailName' type='text' value={trail.name} onChange={handleName} />
                    <p className='inputValidation'>{trailNameVald}</p>
                </div>
                <div>
                    <label >Difficulty</label>
                    <select value={trail.difficulty} onChange={handleDifficulty}>
                        <option value='Very Easy'>Very Easy</option>
                        <option value='Easy'>Easy</option>
                        <option value='Moderate'>Moderate</option>
                        <option value='Hard'>Hard</option>
                        <option value='Very Hard'>Very Hard</option>
                    </select>
                </div>
            </div>
            <div id='secondRow'>
                <div>
                    <label>Distance</label>
                    <input type='number' name='distance' value={trail.distance} onChange={handleDistance} />
                    <p className='inputValidation'>{distanceVald}</p>
                </div>
                <span className='separator' />
                <div>
                    <label>Min Height</label>
                    <input type='number' name='minHeight' value={trail.minHeight} onChange={handleMinHeight} />
                    <p className='inputValidation'>{minHeightVald}</p>
                </div>
                <span className='separator' />
                <div>
                    <label>Max Height</label>
                    <input type='number' name='maxHeight' value={trail.maxHeight} onChange={handleMaxHeight} />
                    <p className='inputValidation'>{maxHeightVald}</p>
                </div>
            </div>
            <div>
                <label htmlFor='description'>Description</label><br />
                <textarea id='description' value={trail.description} onChange={handleDescription} aria-multiline />
            </div>
        </div>
    )
}
