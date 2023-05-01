import WebGPUBinding from './WebGPUBinding.js';
import { GPUBindingType } from './constants.js';

const GPUShaderStage = { VERTEX: 1, FRAGMENT: 2, COMPUTE: 4 };

class WebGPUSampler extends WebGPUBinding {

	constructor( name, texture ) {

		super( name );

		this.isSampler = true;

		this.texture = texture;

		this.type = GPUBindingType.Sampler;
		this.visibility = GPUShaderStage.FRAGMENT;

		this.samplerGPU = null; // set by the renderer

	}

	getTexture() {

		return this.texture;

	}

}

export default WebGPUSampler;
