import { useState, useRef, useCallback, useEffect } from 'react';
import './ResizablePanel.css';

function ResizablePanel({ 
    children, 
    direction = 'horizontal',
    defaultSize = 300,
    minSize = 200,
    maxSize = 600,
    onResize,
    handlePosition = 'right'
}) {
    const [size, setSize] = useState(defaultSize);
    const [isResizing, setIsResizing] = useState(false);
    const panelRef = useRef(null);
    const startPosRef = useRef(0);
    const startSizeRef = useRef(0);

    const handleMouseDown = useCallback((e) => {
        setIsResizing(true);
        startPosRef.current = direction === 'horizontal' ? e.clientX : e.clientY;
        startSizeRef.current = size;
        e.preventDefault();
    }, [direction, size]);

    const handleMouseMove = useCallback((e) => {
        if (!isResizing) return;

        const currentPos = direction === 'horizontal' ? e.clientX : e.clientY;
        const delta = currentPos - startPosRef.current;
        
        // For handle on left side (like sandbox), invert the delta
        // Dragging left (negative delta) should increase size
        // Dragging right (positive delta) should decrease size
        const adjustedDelta = handlePosition === 'left' ? -delta : delta;
        
        const newSize = Math.max(minSize, Math.min(maxSize, startSizeRef.current + adjustedDelta));
        
        setSize(newSize);
        if (onResize) {
            onResize(newSize);
        }
    }, [isResizing, direction, minSize, maxSize, onResize, handlePosition]);

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
    }, []);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isResizing, handleMouseMove, handleMouseUp, direction]);

    const style = direction === 'horizontal' 
        ? { width: size, minWidth: size, maxWidth: size }
        : { height: size, minHeight: size, maxHeight: size };

    return (
        <div 
            ref={panelRef}
            className={`resizable-panel resizable-panel--${direction}`}
            style={style}
        >
            {children}
            <div 
                className={`resize-handle resize-handle--${direction} resize-handle--${handlePosition} ${isResizing ? 'resize-handle--active' : ''}`}
                onMouseDown={handleMouseDown}
            >
                <div className="resize-handle__indicator"></div>
            </div>
        </div>
    );
}

export default ResizablePanel;
