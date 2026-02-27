import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './CompactArrayViz.css';

function CompactArrayViz({ data, comparing = [], swapped = [], sorted = false }) {
    const svgRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!data || !Array.isArray(data) || data.length === 0) return;

        const container = containerRef.current;
        const svg = d3.select(svgRef.current);

        // Fixed dimensions for compact view
        const width = 600;
        const height = 250;
        const margin = { top: 20, right: 20, bottom: 30, left: 20 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Clear previous content
        svg.selectAll('*').remove();

        // Create main group
        const g = svg
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('width', '100%')
            .attr('height', '100%')
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Calculate dimensions
        const maxValue = Math.max(...data, 1);
        const barSpacing = 6;
        // Moderate bar width
        const barWidth = Math.max(25, Math.min(50, (innerWidth - (data.length - 1) * barSpacing) / data.length));
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
            .attr('rx', 3)
            .attr('ry', 3)
            .attr('fill', (d, i) => {
                if (sorted) return '#10b981';
                if (swapped.includes(i)) return '#ef4444';
                if (comparing.includes(i)) return '#f59e0b';
                return '#4ea6b1';
            })
            .attr('stroke', (d, i) => {
                if (comparing.includes(i) || swapped.includes(i)) return '#ffffff';
                return 'none';
            })
            .attr('stroke-width', 2)
            .style('filter', (d, i) => {
                if (comparing.includes(i)) return 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))';
                if (swapped.includes(i)) return 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))';
                return 'none';
            });

        // Value labels on bars
        bars.append('text')
            .attr('x', barWidth / 2)
            .attr('y', d => Math.max(12, yScale(d) / 2))
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('fill', 'white')
            .style('font-family', 'JetBrains Mono, monospace')
            .style('font-weight', 'bold')
            .style('font-size', '12px')
            .text(d => d);

        // Index labels below bars
        g.selectAll('.index-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'index-label')
            .attr('x', (d, i) => startX + i * (barWidth + barSpacing) + barWidth / 2)
            .attr('y', innerHeight + 15)
            .attr('text-anchor', 'middle')
            .style('fill', '#9ca3af')
            .style('font-family', 'JetBrains Mono, monospace')
            .style('font-size', '11px')
            .text((d, i) => i);

    }, [data, comparing, swapped, sorted]);

    return (
        <div ref={containerRef} className="compact-array-viz">
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default CompactArrayViz;
