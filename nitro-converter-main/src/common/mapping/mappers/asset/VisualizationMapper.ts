import { IAssetColor, IAssetColorLayer, IAssetData, IAssetGesture, IAssetPosture, IAssetVisualAnimation, IAssetVisualAnimationLayer, IAssetVisualAnimationSequence, IAssetVisualAnimationSequenceFrame, IAssetVisualAnimationSequenceFrameOffset, IAssetVisualizationData, IAssetVisualizationDirection, IAssetVisualizationLayer } from '../../json';
import { AnimationLayerXML, AnimationXML, ColorLayerXML, ColorXML, FrameOffsetXML, FrameSequenceXML, FrameXML, GestureXML, LayerXML, PostureXML, VisualDirectionXML, VisualizationDataXML, VisualizationXML } from '../../xml';
import { Mapper } from './Mapper';

export class VisualizationMapper extends Mapper
{
    public static mapXML(visualization: any, output: IAssetData): void
    {
        if(!visualization || !output) return;

        VisualizationMapper.mapVisualizationXML(new VisualizationXML(visualization.visualizationData), output);
    }

    private static mapVisualizationXML(xml: VisualizationXML, output: IAssetData): void
    {
        if(!xml || !output) return;

        if(xml.visualizations !== undefined)
        {
            if(xml.visualizations.length)
            {
                output.visualizations = [];

                VisualizationMapper.mapVisualizationDataXML(xml.visualizations, output.visualizations);
            }
        }
    }

    private static mapVisualizationDataXML(xml: VisualizationDataXML[], output: IAssetVisualizationData[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const visualizationDataXML of xml)
        {
            if(visualizationDataXML.size !== undefined)
            {
                if([ 32 ].indexOf(visualizationDataXML.size) >= 0) continue;
            }

            const visualizationData: IAssetVisualizationData = {};

            if(visualizationDataXML.angle !== undefined) visualizationData.angle = visualizationDataXML.angle;
            if(visualizationDataXML.layerCount !== undefined) visualizationData.layerCount = visualizationDataXML.layerCount;
            if(visualizationDataXML.size !== undefined) visualizationData.size = visualizationDataXML.size;

            if(visualizationDataXML.layers !== undefined)
            {
                if(visualizationDataXML.layers.length)
                {
                    visualizationData.layers = {};

                    VisualizationMapper.mapVisualizationLayerXML(visualizationDataXML.layers, visualizationData.layers);
                }
            }

            if(visualizationDataXML.directions !== undefined)
            {
                if(visualizationDataXML.directions.length)
                {
                    visualizationData.directions = {};

                    VisualizationMapper.mapVisualizationDirectionXML(visualizationDataXML.directions, visualizationData.directions);
                }
            }

            if(visualizationDataXML.colors !== undefined)
            {
                if(visualizationDataXML.colors.length)
                {
                    visualizationData.colors = {};

                    VisualizationMapper.mapVisualizationColorXML(visualizationDataXML.colors, visualizationData.colors);
                }
            }

            if(visualizationDataXML.animations !== undefined)
            {
                if(visualizationDataXML.animations.length)
                {
                    visualizationData.animations = {};

                    VisualizationMapper.mapVisualizationAnimationXML(visualizationDataXML.animations, visualizationData.animations);
                }
            }

            if(visualizationDataXML.postures !== undefined)
            {
                visualizationData.postures = {};

                if(visualizationDataXML.defaultPosture !== undefined) visualizationData.postures.defaultPosture = visualizationDataXML.defaultPosture;

                if(visualizationDataXML.postures.length)
                {
                    visualizationData.postures.postures = [];

                    VisualizationMapper.mapVisualizationPostureXML(visualizationDataXML.postures, visualizationData.postures.postures);
                }
            }

            if(visualizationDataXML.gestures !== undefined)
            {
                if(visualizationDataXML.gestures.length)
                {
                    visualizationData.gestures = [];

                    VisualizationMapper.mapVisualizationGestureXML(visualizationDataXML.gestures, visualizationData.gestures);
                }
            }

            output.push(visualizationData);
        }
    }

    private static mapVisualizationLayerXML(xml: LayerXML[], output: { [index: string]: IAssetVisualizationLayer }): void
    {
        if(!xml || !xml.length || !output) return;

        for(const layerXML of xml)
        {
            const layer: IAssetVisualizationLayer = {};

            if(layerXML.x !== undefined) layer.x = layerXML.x;
            if(layerXML.y !== undefined) layer.y = layerXML.y;
            if(layerXML.z !== undefined) layer.z = layerXML.z;
            if(layerXML.alpha !== undefined) layer.alpha = layerXML.alpha;
            if(layerXML.ink !== undefined) layer.ink = layerXML.ink;
            if(layerXML.tag !== undefined) layer.tag = layerXML.tag;
            if(layerXML.ignoreMouse !== undefined) layer.ignoreMouse = layerXML.ignoreMouse;

            output[layerXML.id.toString()] = layer;
        }
    }

    private static mapVisualizationDirectionXML(xml: VisualDirectionXML[], output: { [index: string]: IAssetVisualizationDirection }): void
    {
        if(!xml || !xml.length || !output) return;

        for(const directionXML of xml)
        {
            const direction: IAssetVisualizationDirection = {};

            if(directionXML.layers !== undefined)
            {
                if(directionXML.layers.length)
                {
                    direction.layers = {};

                    VisualizationMapper.mapVisualizationLayerXML(directionXML.layers, direction.layers);
                }
            }

            output[directionXML.id.toString()] = direction;
        }
    }

    private static mapVisualizationColorXML(xml: ColorXML[], output: { [index: string]: IAssetColor }): void
    {
        if(!xml || !xml.length || !output) return;

        for(const colorXML of xml)
        {
            const color: IAssetColor = {};

            if(colorXML.layers !== undefined)
            {
                if(colorXML.layers.length)
                {
                    color.layers = {};

                    VisualizationMapper.mapVisualizationColorLayerXML(colorXML.layers, color.layers);
                }
            }

            output[colorXML.id.toString()] = color;
        }
    }

    private static mapVisualizationColorLayerXML(xml: ColorLayerXML[], output: { [index: string]: IAssetColorLayer }): void
    {
        if(!xml || !xml.length || !output) return;

        for(const colorLayerXML of xml)
        {
            const colorLayer: IAssetColorLayer = {};

            if(colorLayerXML.color !== undefined) colorLayer.color = parseInt(colorLayerXML.color, 16);

            output[colorLayerXML.id.toString()] = colorLayer;
        }
    }

    private static requestNextInsertId(requestId: number, output: { [index: string]: IAssetVisualAnimation }): string
    {
        let id = requestId.toString();

        if(!output[id]) return id;

        let i = 1;

        while(i < 6)
        {
            id += '_' + i;

            if(!output[id]) return id;

            i++;
        }

        return null;
    }

    private static mapVisualizationAnimationXML(xml: AnimationXML[], output: { [index: string]: IAssetVisualAnimation }): void
    {
        if(!xml || !xml.length || !output) return;

        for(const animationXML of xml)
        {
            const animation: IAssetVisualAnimation = {};

            if(animationXML.transitionTo !== undefined) animation.transitionTo = animationXML.transitionTo;
            if(animationXML.transitionFrom !== undefined) animation.transitionFrom = animationXML.transitionFrom;
            if(animationXML.immediateChangeFrom !== undefined) animation.immediateChangeFrom = animationXML.immediateChangeFrom;
            if(animationXML.randomStart !== undefined) animation.randomStart = animationXML.randomStart;

            if(animationXML.layers !== undefined)
            {
                if(animationXML.layers.length)
                {
                    animation.layers = {};

                    VisualizationMapper.mapVisualizationAnimationLayerXML(animationXML.layers, animation.layers);
                }
            }

            const id = this.requestNextInsertId(animationXML.id, output);

            if(!id) continue;

            output[id] = animation;
        }
    }

    private static mapVisualizationAnimationLayerXML(xml: AnimationLayerXML[], output: { [index: string]: IAssetVisualAnimationLayer }): void
    {
        if(!xml || !xml.length || !output) return;

        for(const animationLayerXML of xml)
        {
            const animationLayer: IAssetVisualAnimationLayer = {};

            if(animationLayerXML.frameRepeat !== undefined) animationLayer.frameRepeat = animationLayerXML.frameRepeat;
            if(animationLayerXML.loopCount !== undefined) animationLayer.loopCount = animationLayerXML.loopCount;
            if(animationLayerXML.random !== undefined) animationLayer.random = animationLayerXML.random;

            if(animationLayerXML.frameSequences !== undefined)
            {
                if(animationLayerXML.frameSequences.length)
                {
                    animationLayer.frameSequences = {};

                    VisualizationMapper.mapVisualizationFrameSequenceXML(animationLayerXML.frameSequences, animationLayer.frameSequences);
                }
            }

            output[animationLayerXML.id.toString()] = animationLayer;
        }
    }

    private static mapVisualizationFrameSequenceXML(xml: FrameSequenceXML[], output: { [index: string]: IAssetVisualAnimationSequence }): void
    {
        if(!xml || !xml.length || !output) return;

        let i = 0;

        for(const frameSequenceXML of xml)
        {
            const frameSequence: IAssetVisualAnimationSequence = {};

            if(frameSequenceXML.loopCount !== undefined) frameSequence.loopCount = frameSequenceXML.loopCount;
            if(frameSequenceXML.random !== undefined) frameSequence.random = frameSequenceXML.random;

            if(frameSequenceXML.frames !== undefined)
            {
                if(frameSequenceXML.frames.length)
                {
                    frameSequence.frames = {};

                    VisualizationMapper.mapVisualizationFrameSequenceFrameXML(frameSequenceXML.frames, frameSequence.frames);
                }
            }

            output[i.toString()] = frameSequence;

            i++;
        }
    }

    private static mapVisualizationFrameSequenceFrameXML(xml: FrameXML[], output: { [index: string]: IAssetVisualAnimationSequenceFrame }): void
    {
        if(!xml || !xml.length || !output) return;

        let i = 0;

        for(const frameXML of xml)
        {
            const frame: IAssetVisualAnimationSequenceFrame = {};

            if((frameXML.id === undefined) || (frameXML.id === 'NaN')) frame.id = 0;
            else frame.id = parseInt(frameXML.id);

            if(frameXML.x !== undefined) frame.x = frameXML.x;
            if(frameXML.y !== undefined) frame.y = frameXML.y;
            if(frameXML.randomX !== undefined) frame.randomX = frameXML.randomX;
            if(frameXML.randomY !== undefined) frame.randomY = frameXML.randomY;

            if(frameXML.offsets !== undefined)
            {
                if(frameXML.offsets.length)
                {
                    frame.offsets = {};

                    VisualizationMapper.mapVisualizationFrameSequenceFrameOffsetXML(frameXML.offsets, frame.offsets);
                }
            }

            output[i.toString()] = frame;

            i++;
        }
    }

    private static mapVisualizationFrameSequenceFrameOffsetXML(xml: FrameOffsetXML[], output: { [index: string]: IAssetVisualAnimationSequenceFrameOffset }): void
    {
        if(!xml || !xml.length || !output) return;

        let i = 0;

        for(const offsetXML of xml)
        {
            const offset: IAssetVisualAnimationSequenceFrameOffset = {};

            if(offsetXML.direction !== undefined) offset.direction = offsetXML.direction;
            if(offsetXML.x !== undefined) offset.x = offsetXML.x;
            if(offsetXML.y !== undefined) offset.y = offsetXML.y;

            output[i.toString()] = offset;

            i++;
        }
    }

    private static mapVisualizationPostureXML(xml: PostureXML[], output: IAssetPosture[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const postureXML of xml)
        {
            const posture: IAssetPosture = {};

            if(postureXML.id !== undefined) posture.id = postureXML.id;
            if(postureXML.animationId !== undefined) posture.animationId = postureXML.animationId;

            output.push(posture);
        }
    }

    private static mapVisualizationGestureXML(xml: GestureXML[], output: IAssetGesture[]): void
    {
        if(!xml || !xml.length || !output) return;

        for(const gestureXML of xml)
        {
            const gesture: IAssetGesture = {};

            if(gestureXML.id !== undefined) gesture.id = gestureXML.id;
            if(gestureXML.animationId !== undefined) gesture.animationId = gestureXML.animationId;

            output.push(gesture);
        }
    }
}
