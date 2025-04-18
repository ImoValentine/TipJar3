import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticleBackground = () => {
    const particlesInit = useCallback(async engine => {
        await loadFull(engine); // Correct usage
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: { enable: false },
                background: { color: '#0b0c2a' },
                particles: {
                    number: { value: 60 },
                    size: { value: 2 },
                    color: { value: '#66fcf1' },
                    links: {
                        enable: true,
                        color: '#42f5b6',
                        distance: 120,
                        opacity: 0.4,
                    },
                },
            }}
        />
    );
};

export default ParticleBackground;
