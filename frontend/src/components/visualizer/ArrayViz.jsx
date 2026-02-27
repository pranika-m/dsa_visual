import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function ArrayViz({ data, comparing = [], found = -1, sorted = false, swapped = [] }) {
    const svgRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!data || !Array.isArray(data) || data.length === 0) return;

        const container = containerRef.current;
        const svg = d3.select(svgRef.current);
        
        // Get container dimensions
        const width = container.clientWidth;
        const height = container.clientHeight;
        const margin = { top: 20, right: 20, bottom: 40, left: 20 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Clear previous content
        svg.selectAll('*').remove();

        // Create main group
        const g = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Calculate dimensions
        const maxValue = Math.max(...data, 1);
        const barWidth = Math.max(30, Math.min(60, (innerWidth - (data.length - 1) * 8) / data.length));
        const barSpacing = 8;
        const totalWidth = data.length * barWidth + (data.length - 1) * barSpacing;
        const startX = (innerWidth - totalWidth) / 2;

        // Create scales
        const yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([0, innerHeight - 30]);

        // Create bars
        const bars = g.selectAll('.bar')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'bar')
            .attr('transform', (d, i) => `translate(${startX + i * (barWidth + barSpacing)}, ${innerHeight - yScale(d)})`);

        // Bar rectangles
        bars.append('rect')
            .attr('width', barWidth)
            .attr('height', d => yScale(d))
            .attr('rx', 4)
            .attr('ry', 4)
            .attr('fill', (d, i) => {
                if (found === i) return '#10b981'; // Green for found
                if (comparing.includes(i)) return '#f59e0b'; // Orange for comparing
                if (swapped.includes(i)) return '#ef4444'; // Red for swapped
                if (sorted) return '#10b981'; // Green for sorted
                return '#4ea6b1';
            })
            .attr('stroke', (d, i) => {
                if (found === i || comparing.includes(i) || swapped.includes(i)) return '#ffffff';
                return 'none';
            })
            .attr('stroke-width', 2)
            .style('filter', (d, i) => {
                if (found === i) return 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.6))';
                if (comparing.includes(i)) return 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.5))';
                return 'none';
            })
            .style('transition', 'all 0.3s ease');

        // Value labels on bars
        bars.append('text')
            .attr('x', barWidth / 2)
            .attr('y', d => yScale(d) / 2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('fill', 'white')
            .style('font-family', 'JetBrains Mono, monospace')
            .style('font-weight', 'bold')
            .style('font-size', '14px')
            .text(d => d);

        // Index labels below bars
        g.selectAll('.index-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'index-label')
            .attr('x', (d, i) => startX + i * (barWidth + barSpacing) + barWidth / 2)
            .attr('y', innerHeight + 20)
            .attr('text-anchor', 'middle')
            .style('fill', '#9ca3af')
            .style('font-family', 'JetBrains Mono, monospace')
            .style('font-size', '12px')
            .text((d, i) => i);

    }, [data, comparing, found, sorted, swapped]);

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default ArrayViz;
