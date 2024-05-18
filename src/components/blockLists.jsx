const svgs = [
    <circle cx="25" cy="25" r="20" fill="red" />,
    <rect width="50" height="50" fill="green" />,
    <polygon points="25,0 50,50 0,50" fill="blue" />,
];

const BlockLists = () => <div>
    <h2 className="display-6 fs-2">Library</h2>
    <input className="form-control" />
    <div className="block-lists">
        {
            svgs.map(svg => 
                <svg width="50px" height="50px" style={{ position:"static" }} className="m-2">
                    { svg }
                </svg>
            )
        }
    </div>
</div>

export { BlockLists }