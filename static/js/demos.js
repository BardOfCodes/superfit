/**
 * demos.js - Interactive demo functionality for SuperFit website
 * Handles shader gallery and editing demo interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // Shader Gallery - Interactive shape viewer
  // ============================================
  const shaderThumbs = document.querySelectorAll('.shader-thumb');
  const shaderIframe = document.getElementById('shader-gallery-iframe');
  const shaderPlaceholder = document.getElementById('shader-gallery-placeholder');
  const meshRenderImage = document.getElementById('mesh-render-image');
  const meshRenderContainer = document.getElementById('mesh-render-container');
  const meshRenderPlaceholder = document.getElementById('mesh-render-placeholder');
  const unloadShaderBtn = document.getElementById('unload-shader-gallery-btn');
  const unloadShaderContainer = document.getElementById('shader-gallery-unload-container');
  
  if (shaderThumbs.length > 0 && shaderIframe && shaderPlaceholder) {
    shaderThumbs.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        const shaderNum = this.getAttribute('data-shader');
        const shaderUrl = './static/shaders/example_' + shaderNum + '/index.html';
        const imageUrl = './static/shaders/example_' + shaderNum + '/img.png';
        
        // Update active state
        shaderThumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Update mesh render image
        if (meshRenderImage && meshRenderContainer && meshRenderPlaceholder) {
          meshRenderPlaceholder.style.display = 'none';
          meshRenderImage.src = imageUrl;
          meshRenderContainer.style.display = 'flex';
        }
        
        // Hide placeholder and show iframe
        shaderPlaceholder.style.display = 'none';
        shaderIframe.style.display = 'block';
        shaderIframe.src = shaderUrl;
        
        // Show unload button
        if (unloadShaderContainer) {
          unloadShaderContainer.style.display = 'block';
        }
      });
    });
    
    // Unload shader button handler
    if (unloadShaderBtn && unloadShaderContainer) {
      unloadShaderBtn.addEventListener('click', function() {
        // Unload the iframe
        shaderIframe.src = '';
        shaderIframe.style.display = 'none';
        
        // Show shader placeholder again
        shaderPlaceholder.style.display = 'flex';
        
        // Reset mesh render
        if (meshRenderImage && meshRenderContainer && meshRenderPlaceholder) {
          meshRenderImage.src = '';
          meshRenderContainer.style.display = 'none';
          meshRenderPlaceholder.style.display = 'flex';
        }
        
        // Remove active state from all thumbnails
        shaderThumbs.forEach(t => t.classList.remove('active'));
        
        // Hide unload button
        unloadShaderContainer.style.display = 'none';
      });
    }
  }
  
  // ============================================
  // Editing Demo - Load/Unload functionality
  // ============================================
  const loadDemoBtn = document.getElementById('load-editing-demo-btn');
  const unloadDemoBtn = document.getElementById('unload-editing-demo-btn');
  const demoBanner = document.getElementById('editing-demo-banner');
  const demoIframeContainer = document.getElementById('editing-demo-iframe');
  
  if (loadDemoBtn && demoIframeContainer) {
    const demoIframe = demoIframeContainer.querySelector('iframe');
    
    loadDemoBtn.addEventListener('click', function() {
      // Hide the banner
      demoBanner.style.display = 'none';
      // Show and load the iframe
      demoIframeContainer.style.display = 'block';
      demoIframe.src = './static/shaders/edit_example/edit.html';
    });
    
    if (unloadDemoBtn) {
      unloadDemoBtn.addEventListener('click', function() {
        // Unload the iframe (stop the shader)
        demoIframe.src = '';
        // Hide the iframe container
        demoIframeContainer.style.display = 'none';
        // Show the banner again
        demoBanner.style.display = 'block';
      });
    }
  }
  
});
