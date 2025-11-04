/**
 * Sharp fallback adapter for Payload CMS
 * 
 * This is a simple passthrough for sharp, importing it directly
 * This file exists as a convenient place to swap implementations if needed
 */
import sharp from 'sharp';

// Just re-export the standard sharp module
export default sharp;