import ArrayViz from './ArrayViz';
import './VizCanvas.css';

function VizCanvas({ 
    vizType = 'array', 
    frame = {}, 
    description = 'Ready to visualize' 
}) {
    const renderVisualization = () => {
        switch (vizType) {
            case 'array':
                return (
                    <ArrayViz
                        data={frame.state || []}
                        comparing={frame.comparing || []}
                        found={frame.found !== undefined ? frame.found : -1}
                        sorted={frame.sorted || false}
                        swapped={frame.swapped || []}
                    />
                );
            case 'linked_list':
                return (
                    <div className="viz-placeholder">
                        <p>Linked List visualization coming soon</p>
                        <div className="viz-placeholder__data">
                            Data: {JSON.stringify(frame.state)}
                        </div>
                    </div>
                );
            case 'stack':
                return (
                    <div className="viz-placeholder">
                        <p>Stack visualization coming soon</p>
                        <div className="viz-placeholder__data">
                            Data: {JSON.stringify(frame.state)}
                        </div>
                    </div>
                );
            case 'queue':
                return (
                    <div className="viz-placeholder">
                        <p>Queue visualization coming soon</p>
                        <div className="viz-placeholder__data">
                            Data: {JSON.stringify(frame.state)}
                        </div>
                    </div>
                );
            case 'tree':
                return (
                    <div className="viz-placeholder">
                        <p>Tree visualization coming soon</p>
                        <div className="viz-placeholder__data">
                            Data: {JSON.stringify(frame.state)}
                        </div>
                    </div>
                );
            case 'graph':
                return (
                    <div className="viz-placeholder">
                        <p>Graph visualization coming soon</p>
                        <div className="viz-placeholder__data">
                            Data: {JSON.stringify(frame.state)}
                        </div>
                    </div>
                );
            case 'heap':
                return (
                    <div className="viz-placeholder">
                        <p>Heap visualization coming soon</p>
                        <div className="viz-placeholder__data">
                            Data: {JSON.stringify(frame.state)}
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="viz-placeholder">
                        <p>Unknown visualization type: {vizType}</p>
                    </div>
                );
        }
    };

    return (
        <div className="viz-canvas-container">
            <div className="viz-canvas__area">
                {frame.state ? renderVisualization() : (
                    <div className="viz-canvas__placeholder">
                        <p>Select an action and press Play to start visualization</p>
                    </div>
                )}
            </div>
            <div className="viz-canvas__description">
                {frame.description || description}
            </div>
        </div>
    );
}

export default VizCanvas;
